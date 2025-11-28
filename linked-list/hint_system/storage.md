// original
{
    "userId": "user-1700000000-1234",
    "eventType": "incrementStep",
    "details": {
        "step": 1
    },
    "timestamp": "2025-11-13T00:00:00.123Z"
}

// hint REQUESTED -- generating a new set of hints
{
    "userId": "user-1700000000-1234",
    "eventType": "hint_requested",
    "details": {
        "step": 1,
        "previousHintsCount": 0 //how many hint sets requested before --> stepData.hints.length
    },
    "timestamp": "2025-11-13T00:00:01.234Z"
}

// hint REVEALED
{
    "userId": "user-1700000000-1234",
    "eventType": "hint_revealed",
    "details": {
        "step": 1,
        "level": "prompt",  (prompt/reasoning/explanation,etc.)
        "levelIndex": 0,
        "hintText": "What does an empty box in the visualization mean?",
        "hintsShownSoFar": 1,
        "totalHintsAvailable": 5
    },
    "timestamp": "2025-11-13T00:00:01.345Z"
}

// Hint feedback - thumbs up
{
    "userId": "user-1700000000-1234",
    "eventType": "hint_feedback",
    "details": {
        "step": 1,
        "level": "explanation",  (prompt/reasoning/explanation,etc.)
        "levelIndex": 2
        "rating": "thumbs_up",
        "hintText": "Right - it should skip this if statement because..."
    },
    "timestamp": "2025-11-13T00:00:04.678Z"
}



// Events to log:
1. "hint_requested"    // User clicks "Hint" button (new hint generation)
2. "hint_revealed"    // User reveals next hint level (Prompt -> Reasoning -> Explanation)
3. "hint_feedback"     // User gives thumbs up/down feedback on a hint
others?