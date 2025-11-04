import cv2
import numpy as np
from io import BytesIO

def preprocess_image(image_data: bytes) -> np.ndarray:
    """
    Preprocess image for better OCR:
    - Convert to grayscale
    - Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    - Denoise
    - Threshold
    """
    # Read image from bytes
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Could not decode image")
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply CLAHE
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    
    # Denoise
    denoised = cv2.fastNlMeansDenoising(enhanced, h=10)
    
    # Binary threshold
    _, binary = cv2.threshold(denoised, 150, 255, cv2.THRESH_BINARY)
    
    return binary

def get_image_from_bytes(image_bytes: bytes) -> np.ndarray:
    """Convert bytes to OpenCV image"""
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img
