import { useMemo } from "react"
import { useAppDispatch } from "../store/store"
import { handleFilters } from "../store/jobsSlice"
import { JobType } from "../types/JobType"
import styles from "../styles/Job.module.css"

type JobProp = {
    job: {
        id: number
        company: string
        logo: string
        isNew: boolean
        isFeatured: boolean
        position: string
        role: string
        level: string
        postedAt: string
        contract: string
        location: string
        languages: string[]
        tools: string[]
    }
}

const Job = ({ job }: JobProp) => {
    const {
        id,
        company,
        logo,
        isNew,
        isFeatured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools,
    }: JobType = job

    const dispatch = useAppDispatch()

    const tags = useMemo(() => [role, level, ...languages, ...tools], [])

    return (
        <article className={styles.job}>
            <div className={styles.container}>
                {isFeatured && <div className={styles.featuredLine}></div>}
                <div className={styles.main}>
                    <img src={logo} alt={company} className={styles.logo} />

                    <div className={styles.info}>
                        <div className={styles.heading}>
                            <h3>{company}</h3>
                            {isNew && (
                                <div className={styles.new}>
                                    <span>new!</span>
                                </div>
                            )}
                            {isFeatured && (
                                <div className={styles.featured}>
                                    <span>featured</span>
                                </div>
                            )}
                        </div>
                        <h1 className={styles.position}>{position}</h1>
                        <ul className={styles.additionalInfo}>
                            <li>{postedAt}</li>•<li>{contract}</li>•<li>{location}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <ul className={styles.tags}>
                    {tags.map((tag, index) => {
                        return (
                            <li
                                key={index}
                                className={styles.tag}
                                onClick={() => dispatch(handleFilters(tag))}
                            >
                                {tag}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </article>
    )
}

export default Job
