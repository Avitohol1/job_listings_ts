import { useAppSelector, useAppDispatch } from "../store/store"
import { deleteFilter, clearFilters } from "../store/jobsSlice"
import styles from "../styles/Filters.module.css"

const Filters = () => {
    const { filters } = useAppSelector((store) => store.jobs)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.filters}>
            {filters.map((filter, index) => {
                return (
                    <div key={index} className={styles.filter}>
                        <span>{filter}</span>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => dispatch(deleteFilter(filter))}
                        >
                            X
                        </button>
                    </div>
                )
            })}
            <button className={styles.clearBtn} onClick={() => dispatch(clearFilters())}>
                clear
            </button>
        </div>
    )
}

export default Filters
