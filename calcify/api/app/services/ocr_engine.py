import pytesseract
import numpy as np
import logging

logger = logging.getLogger(__name__)

def extract_equation(image: np.ndarray) -> str:
    """
    Extract mathematical equation text from image using Tesseract OCR
    """
    try:
        # Configure Tesseract for math recognition
        custom_config = r'--psm 6 -c tessedit_char_whitelist=0123456789+-*/()=x.^√∑∏∫'
        
        # Extract text
        text = pytesseract.image_to_string(image, config=custom_config)
        
        # Clean up whitespace
        equation = text.strip()
        
        if not equation:
            raise ValueError("No text detected in image")
        
        logger.info(f"OCR extracted: {equation}")
        return equation
    except Exception as e:
        logger.error(f"OCR error: {str(e)}")
        raise

def extract_equation_with_confidence(image: np.ndarray) -> tuple:
    """
    Extract equation and return confidence score
    """
    try:
        data = pytesseract.image_to_data(image, output_type='dict')
        
        # Calculate average confidence
        confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0
        
        text = pytesseract.image_to_string(image).strip()
        
        return text, avg_confidence / 100.0
    except Exception as e:
        logger.error(f"OCR error: {str(e)}")
        raise
