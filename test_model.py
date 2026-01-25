# test_model.py 
print("Script started")

try:
    from transformers import AutoTokenizer, AutoModelForCausalLM
    
    # Check if model exists first
    import os
    print(f"Current directory: {os.getcwd()}")
    print(f"Looking for model at: models/medgemma")
    
    # Load the model
    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained("models/medgemma")
    print("Tokenizer loaded!")
    
    print("Loading model...")
    model = AutoModelForCausalLM.from_pretrained("models/medgemma")
    print("Model loaded successfully!")
    
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()

print("Script finished!")