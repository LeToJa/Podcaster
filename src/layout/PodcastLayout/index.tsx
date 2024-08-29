import { PodcastLayoutTypes } from './types'

const PodcastLayout = ({ children, aside: { name } }: PodcastLayoutTypes) => <>
    <section>
        <aside>
            {name}
        </aside>
        <article>
            {children}
        </article>
    </section>
</>

export default PodcastLayout