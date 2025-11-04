from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
import base64
from io import BytesIO

from app.services.ocr_engine import extract_equation
from app.services.solver import solve_equation
from app.services.preprocess import preprocess_image

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/solve", tags=["solve"])

class SolveRequest(BaseModel):
    image: str  # base64 encoded image

class SolveResponse(BaseModel):
    latex: str
    result: str
    steps: list[str]

@router.post("", response_model=SolveResponse)
async def solve_problem(request: SolveRequest):
    """
    Main endpoint: 
    1. Decode base64 image
    2. Preprocess image
    3. Extract equation via OCR
    4. Solve using SymPy
    5. Return LaTeX, steps, and result
    """
    try:
        # Decode base64
        image_data = base64.b64decode(request.image)
        
        # Preprocess image
        processed_image = preprocess_image(image_data)
        
        # Extract equation text
        equation_text = extract_equation(processed_image)
        logger.info(f"Extracted equation: {equation_text}")
        
        # Solve equation
        result = solve_equation(equation_text)
        
        return SolveResponse(
            latex=result['latex'],
            result=result['result'],
            steps=result['steps']
        )
    except Exception as e:
        logger.error(f"Solve failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
