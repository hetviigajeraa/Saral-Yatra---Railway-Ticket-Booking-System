// Client for SaralYatra Python Flask AI Backend API
const API_BASE_URL = 'http://127.0.0.1:5000/api';

/**
 * Fetch AI Train Recommendations from the Python Flask Backend
 */
export async function fetchAiRecommendations({
  fromCode = 'BCT',
  toCode = 'ADI',
  priorities = null,
  preferredTime = null,
} = {}) {
  // Retrieve saved user preferences from localStorage if not explicitly passed
  let userPriorities = priorities;
  let userPreferredTime = preferredTime;

  if (!userPriorities) {
    try {
      const saved = localStorage.getItem('saralyatra_ai_preferences');
      if (saved) {
        const parsed = JSON.parse(saved);
        userPriorities = parsed.priorities;
        userPreferredTime = parsed.preferredTime;
      }
    } catch (e) {
      // Ignore
    }
  }

  if (!userPriorities) {
    userPriorities = ['lower_price', 'shorter_journey'];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_code: fromCode,
        to_code: toCode,
        priorities: userPriorities,
        preferred_time: userPreferredTime,
      }),
    });

    if (!response.ok) {
      throw new Error(`Python API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.trains) {
      return {
        success: true,
        fromBackend: true,
        trains: data.trains,
        topRecommendation: data.top_recommendation,
      };
    }
  } catch (error) {
    console.warn('Python Flask API offline or unreachable. Using fallback engine.', error);
  }

  return {
    success: false,
    fromBackend: false,
  };
}
