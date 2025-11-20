const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
    you are an AI trained to generate techical interview questions and answers.
    
    Task: 
     -Role: ${role}
     -Candidate Experience: ${experience} years
     -Focus Topics: ${topicsToFocus}
     -Write ${numberOfQuestions} inerview questions
     -For each questions, generate a detailed but beginner-friendly answer
     -if the answer needs a code example, add a small code block inside.
     -Keep formatting very clean
     -Return a pure JSON array like:
     [
     {
      "question": "Questions are here?",
      "answer": "Answer here."
     },
     ...
     ]
     Important: Do not add any extra text. Only return valid JSON.`
)

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given interview question.

    Task: 

    -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    -Questions: "${question}
    -After the explanation, provide a short and clear title that summarizes the concept for the articles or page header
    -if the answer needs a code example, add a small code block inside.
     -Keep formatting very clean
     -Return a pure JSON array like:
     {
      "title" : "Short title here?"
      "explanation" : "Explanation here"
     }
      Important: Do not add any extra text. Only return valid JSON.
    `;

    module.exports = { questionAnswerPrompt, conceptExplainPrompt };