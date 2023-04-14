import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/store"
import { toggleIsLoading } from "../store/jobsSlice"
import styles from "../styles/Jobs.module.css"
import Job from "./Job"
import Filters from "./Filters"
import { RingLoader } from "react-spinners"

const Jobs = () => {
    const { isLoading, filteredJobs, filters } = useAppSelector((store) => store.jobs)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const loadingTimeout: NodeJS.Timeout = setTimeout((): void => {
            dispatch(toggleIsLoading())
        }, 3000)
        return () => {
            clearTimeout(loadingTimeout)
        }
    }, [])

    if (isLoading) {
        return (
            <div className="loader">
                <RingLoader
                    color="hsl(180, 29%, 50%)"
                    loading={isLoading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }
    return (
        <section className={styles.jobs}>
            {filters.length > 0 && <Filters />}
            {filteredJobs.map((job) => {
                return <Job job={job} key={job.id} />
            })}
        </section>
    )
}

export default Jobs
