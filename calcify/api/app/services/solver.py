import sympy as sp
from sympy import symbols, Eq, solve, latex, simplify
import logging
import re

logger = logging.getLogger(__name__)

def parse_equation(equation_str: str) -> str:
    """
    Parse and clean equation string for SymPy
    Handles common variations in notation
    """
    # Remove spaces
    eq = equation_str.replace(" ", "")
    
    # Replace common symbols
    eq = eq.replace("×", "*")
    eq = eq.replace("÷", "/")
    eq = eq.replace("−", "-")
    
    # Handle ^ for exponentiation
    eq = eq.replace("^", "**")
    
    return eq

def solve_equation(equation_text: str) -> dict:
    """
    Solve a mathematical equation using SymPy
    Returns:
    - latex: LaTeX representation of the equation
    - result: The solution
    - steps: List of solution steps
    """
    try:
        # Parse equation
        parsed = parse_equation(equation_text)
        logger.info(f"Parsed equation: {parsed}")
        
        # Define symbols
        x = symbols('x', real=True)
        
        # Try to parse as equation with = sign
        if '=' in parsed:
            left, right = parsed.split('=', 1)
            lhs = sp.sympify(left)
            rhs = sp.sympify(right)
            equation = Eq(lhs, rhs)
        else:
            # Assume it's an expression = 0
            equation = Eq(sp.sympify(parsed), 0)
        
        # Generate LaTeX
        equation_latex = latex(equation)
        
        # Solve
        solutions = solve(equation, x)
        
        if not solutions:
            raise ValueError("No solution found")
        
        # Format result
        solution = solutions[0]
        solution_latex = latex(solution)
        
        # Generate steps (simplified)
        steps = [
            f"Original equation: {parsed}",
            f"Simplify and isolate variable",
            f"Solution: x = {solution_latex}"
        ]
        
        return {
            "latex": equation_latex,
            "result": str(solution),
            "steps": steps
        }
    except Exception as e:
        logger.error(f"Solve error: {str(e)}")
        raise ValueError(f"Could not solve equation: {str(e)}")

def get_solution_steps(equation_text: str) -> list:
    """
    Generate detailed solution steps (simplified version)
    """
    steps = [
        "Step 1: Identify the equation",
        "Step 2: Apply algebraic operations",
        "Step 3: Isolate the variable",
        "Step 4: Verify the solution"
    ]
    return steps
