import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import GoalForm from "../components/GoalForm"
import Spinner from "../components/Spinner"
import { reset, getGoals } from "../features/goals/goalSlice"
import GoalItem from "../components/GoalItem"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)

  const { goals, isLoading, isError, message } = useSelector(
    (state: any) => state.goals,
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate("/login")
    }

    dispatch(getGoals() as any)

    return () => {
      dispatch(reset() as any)
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal: any) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals </h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
