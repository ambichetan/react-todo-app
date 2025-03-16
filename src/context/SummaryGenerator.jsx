export const generateSummary = async (todos, dispatch) => {
  console.log("generateSummary function called");
  dispatch({ type: "SET_LOADING_SUMMARY", payload: true });

  try {
    // Filter out completed todos
    const activeTodos = todos.filter((todo) => !todo.completed);
    console.log("Active todos:", activeTodos);

    if (activeTodos.length === 0) {
      console.log("No active todos found");
      dispatch({
        type: "SET_SUMMARY",
        payload: "No active todos to summarize.",
      });
      return;
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found in environment variables");
    }

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes todo lists.",
        },
        {
          role: "user",
          content: `Please provide a concise summary of these active todos: ${activeTodos
            .map((t) => t.text)
            .join(", ")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    };

    const response = await fetch(
      "https://api.venice.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `OpenAI API responded with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const summary =
      data.choices[0]?.message?.content || "Unable to generate summary";
    console.log("Generated summary:", summary);

    dispatch({ type: "SET_SUMMARY", payload: summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    dispatch({
      type: "SET_SUMMARY",
      payload: `Failed to generate summary: ${error.message}`,
    });
  } finally {
    dispatch({ type: "SET_LOADING_SUMMARY", payload: false });
  }
};
