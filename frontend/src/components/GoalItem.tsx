import { useDispatch } from "react-redux"
import { deleteGoal } from "../features/goals/goalSlice"

const GoalItem = ({ goal }: { goal: any }) => {
  const dispatch = useDispatch()
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button
        className="close"
        onClick={() => dispatch(deleteGoal(goal._id) as any)}
      >
        X
      </button>
    </div>
  )
}

export default GoalItem
