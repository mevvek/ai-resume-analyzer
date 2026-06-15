import pdfplumber
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Takes raw PDF bytes, returns all text as a single string.
    Works with file uploads from FastAPI.
    """
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()


def clean_text(raw_text: str) -> str:
    """
    Removes blank lines and extra spaces from extracted text.
    Makes the text cleaner before sending to the LLM.
    """
    lines = [line.strip() for line in raw_text.splitlines()]
    lines = [line for line in lines if line]
    return "\n".join(lines)