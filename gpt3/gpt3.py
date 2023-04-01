import openai

def askGPT(text):
    openai.api_key = "GPT3_SECRET_API_KEY"

    response = openai.Completion.create(
        engine = "text-davinci-003",
        prompt = text,
        temperature = 0.6,
        max_tokens = 150,
    )

    return response.choices[0].text

def main():
    text = input("Enter your text: ")
    print(askGPT(text))

if __name__ == "__main__":
    main()

# python3 ./gpt3/gpt3.py 
# A kindergardener is learning to identify objects. What are some simple questions to ask about an image with a laptop computer with a cell phone and a cell phone. Give answer in next line to each question