from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained("models/medgemma")
model = AutoModelForCausalLM.from_pretrained("models/medgemma")

class NoteInput(BaseModel):
    notes: str

@app.post("/generate-report")
def generate_report(data: NoteInput):
    prompt = f"""
You are a medical assistant. Convert the following notes into a structured clinical report using SOAP format.

Notes:
{data.notes}

Report:
"""
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=300)
    report = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"report": report}