"""
===================================================================
SaralYatra Goal-Based AI Train Recommendation Engine
===================================================================

College Viva Explanation:
-------------------------
The recommendation system uses a Multi-Criteria Goal-Based Decision Model:

Total Score (0 - 100) = Price Score (max 30) 
                       + Speed Score (max 30) 
                       + Availability Score (max 20) 
                       + Departure Time Score (max 20)

1. Price Score (Max 30 Pts):
   Inverse linear normalization of lowest fare relative to route range.
   Formula: 30 * (1 - (fare - min_fare) / (max_fare - min_fare))

2. Speed Score (Max 30 Pts):
   Inverse linear normalization of travel duration relative to route range.
   Formula: 30 * (1 - (duration - min_dur) / (max_dur - min_dur))

3. Availability Score (Max 20 Pts):
   Direct linear ratio based on available confirmed seats.
   Formula: 20 * (available_seats / max_available_on_route)

4. Time Fit Score (Max 20 Pts):
   Full 20 points if departure falls inside user's preferred time window.

User Preference Multipliers:
User selected priorities boost the weight of the corresponding sub-scores,
ensuring personalization according to traveler goals.
"""

class GoalBasedTrainRecommender:
    def __init__(self, trains_data):
        self.trains_data = trains_data

    def evaluate_trains(self, priorities=None, preferred_time=None):
        """
        Evaluates and scores candidate trains out of 100 based on rule-based goals.
        Returns:
            best_train (dict): The #1 AI recommended train.
            scored_list (list): All candidate trains sorted by AI Score.
        """
        if not self.trains_data:
            return None, []

        if not priorities:
            priorities = ['lower_price', 'shorter_journey']

        # Step 1: Calculate route-level min/max bounds for normalization
        fares = [min(c['fare'] for c in t['classes']) for t in self.trains_data]
        durations = [t['durationMins'] for t in self.trains_data]
        seats = [max(c['available'] for c in t['classes']) for t in self.trains_data]

        min_fare, max_fare = min(fares), max(fares)
        min_dur, max_dur = min(durations), max(durations)
        min_seats, max_seats = min(seats), max(seats)

        scored_trains = []

        for train in self.trains_data:
            lowest_fare = min(c['fare'] for c in train['classes'])
            duration_mins = train['durationMins']
            available_seats = max(c['available'] for c in train['classes'])
            dep_hour = int(train['departureTime'].split(':')[0])

            # -------------------------------------------------------------
            # Sub-score 1: Price Score (0 to 30)
            # -------------------------------------------------------------
            if max_fare > min_fare:
                price_norm = 1.0 - ((lowest_fare - min_fare) / (max_fare - min_fare))
            else:
                price_norm = 1.0
            price_score = price_norm * 30.0

            # -------------------------------------------------------------
            # Sub-score 2: Speed / Duration Score (0 to 30)
            # -------------------------------------------------------------
            if max_dur > min_dur:
                speed_norm = 1.0 - ((duration_mins - min_dur) / (max_dur - min_dur))
            else:
                speed_norm = 1.0
            speed_score = speed_norm * 30.0

            # -------------------------------------------------------------
            # Sub-score 3: Seat Availability Score (0 to 20)
            # -------------------------------------------------------------
            if max_seats > 0:
                avail_norm = min(1.0, available_seats / max_seats)
            else:
                avail_norm = 0.5
            avail_score = avail_norm * 20.0

            # -------------------------------------------------------------
            # Sub-score 4: Departure Time Score (0 to 20)
            # -------------------------------------------------------------
            time_score = 10.0  # Base 10 points for all
            if preferred_time:
                is_match = False
                if preferred_time == 'morning' and 6 <= dep_hour < 12:
                    is_match = True
                elif preferred_time == 'afternoon' and 12 <= dep_hour < 17:
                    is_match = True
                elif preferred_time == 'evening' and 17 <= dep_hour < 21:
                    is_match = True
                elif preferred_time == 'night' and (21 <= dep_hour or dep_hour < 6):
                    is_match = True

                if is_match:
                    time_score = 20.0

            # Apply Priority Weight Boosts
            if 'lower_price' in priorities:
                price_score *= 1.15
            if 'shorter_journey' in priorities:
                speed_score *= 1.15
            if 'seat_availability' in priorities:
                avail_score *= 1.15

            # Total aggregate raw score out of 100
            total_raw = price_score + speed_score + avail_score + time_score

            # Scale and clamp between 55 and 98 for clean presentation
            final_score = int(min(98, max(55, round(total_raw))))

            # Formulate rule-based explanation
            reasons = []
            if lowest_fare == min_fare:
                reasons.append("Lowest fare available on this route")
            if duration_mins == min_dur:
                reasons.append("Fastest travel time")
            if available_seats >= 40:
                reasons.append("High seat availability")

            if not reasons:
                reasons.append("Optimal balance of fare, speed, and comfort")

            explanation = ". ".join(reasons) + "."

            scored_trains.append({
                "id": train["id"],
                "number": train["number"],
                "name": train["name"],
                "type": train["type"],
                "from": train["from"],
                "to": train["to"],
                "departureTime": train["departureTime"],
                "arrivalTime": train["arrivalTime"],
                "duration": train["duration"],
                "distance": train["distance"],
                "lowestFare": lowest_fare,
                "availableSeats": available_seats,
                "aiScore": final_score,
                "aiRecommended": False,
                "aiReason": explanation,
                "scoreBreakdown": {
                    "priceScore": round(price_score, 1),
                    "speedScore": round(speed_score, 1),
                    "availScore": round(avail_score, 1),
                    "timeScore": round(time_score, 1)
                }
            })

        # Sort descending by AI score
        scored_trains.sort(key=lambda t: t['aiScore'], reverse=True)

        if scored_trains:
            scored_trains[0]['aiRecommended'] = True

        best_train = scored_trains[0] if scored_trains else None

        return best_train, scored_trains


# Legacy wrapper helper function for Flask app route handler
def evaluate_train_recommendations(trains_list, priorities=None, preferred_time=None):
    recommender = GoalBasedTrainRecommender(trains_list)
    best_train, scored_list = recommender.evaluate_trains(priorities, preferred_time)
    return scored_list
