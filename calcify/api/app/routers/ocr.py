from fastapi import APIRouter, UploadFile, File, HTTPException
import logging
from app.services.ocr_engine import extract_equation

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/ocr", tags=["ocr"])

@router.post("/extract")
async def extract_ocr(file: UploadFile = File(...)):
    """Extract text from an image using Tesseract OCR"""
    try:
        contents = await file.read()
        equation_text = extract_equation(contents)
        return {
            "success": True,
            "equation": equation_text,
            "confidence": 0.85  # Mock confidence
        }
    except Exception as e:
        logger.error(f"OCR extraction failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
