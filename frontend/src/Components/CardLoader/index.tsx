import ContentLoader from "react-content-loader";
import './styles.css';

const CardLoader = () => (
    <div className="card-loader-container">
        <ContentLoader 
            speed={2}
            width={320}
            height={250}
            viewBox="0 0 320 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            >
            <rect x="0" y="0" rx="2" ry="2" width="320" height="250" />
        </ContentLoader>
    </div>
)

export default CardLoader;