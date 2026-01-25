print("Script started")
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("models/medgemma")
model = AutoModelForCausalLM.from_pretrained("models/medgemma")
print("Model loaded successfully")