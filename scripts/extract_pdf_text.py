#!/usr/bin/env python3
import argparse
from pathlib import Path

import pdfplumber


def extract_text(pdf_path: Path) -> str:
    parts = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        for idx, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            parts.append(f"\n\n--- Page {idx} ---\n")
            parts.append(text)
    return "\n".join(parts).strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract text from a PDF.")
    parser.add_argument("pdf", type=Path, help="Path to the PDF file")
    parser.add_argument(
        "-o",
        "--out",
        type=Path,
        help="Output text file path (default: <pdf>.txt)",
    )
    args = parser.parse_args()

    pdf_path = args.pdf
    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    out_path = args.out or pdf_path.with_suffix(".txt")
    text = extract_text(pdf_path)
    out_path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
