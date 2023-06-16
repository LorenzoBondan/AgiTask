import { Tooltip as ReactTooltip } from 'react-tooltip'
import './styles.css';

const Companies = () => {

    const companies = [
        {
            name: "Apple",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png"
        },
        {
            name: "Microsoft",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
        },
        {
            name: "BMW",
            imgUrl: "https://vetores.org/d/bmw.svg"
        },
        {
            name: "CNN",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/2048px-CNN_International_logo.svg.png"
        },
        {
            name: "Discovery",
            imgUrl: "https://logodownload.org/wp-content/uploads/2017/04/discovery-channel-logo-0.png"
        },
        {
            name: "Land Rover",
            imgUrl: "https://www.imagensempng.com.br/wp-content/uploads/2020/12/0029.png"
        },
        {
            name: "Coca-Cola",
            imgUrl: "https://logospng.org/download/coca-cola/logo-coca-cola-1536.png"
        },
        {
            name: "Grêmio",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Gremio_logo.gif"
        },
        {
            name: "Mc Donalds",
            imgUrl: "https://www.mcdonalds.com.br/images/layout/mcdonalds-logo-bg-red.png"
        },
        {
            name: "Dell",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/800px-Dell_logo_2016.svg.png"
        },
        {
            name: "Amazon",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"
        },
        {
            name: "Jeep",
            imgUrl: "https://logowik.com/content/uploads/images/jeep.jpg"
        },
        {
            name: "Nivea",
            imgUrl: "https://logodownload.org/wp-content/uploads/2017/03/nivea-logo-1-1.png"
        },
        {
            name: "Adidas",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png"
        },
        {
            name: "Netflix",
            imgUrl: "https://i.pinimg.com/originals/da/f3/0f/daf30fac5e16393d66a3684dd27e29af.png"
        },

    ]
    return(
        <div className='companies-container'>
            <h3>Companies that are already using AgiTask</h3>
            <div className='row companies-row'>
                {companies.sort( (a,b) => a.name > b.name ? 1 : -1).map(company => (
                    <div className="col-sm-12 col-lg-4 col-xl-2 utilized-column">
                    <div className='company base-card'>
                        <img src={company.imgUrl} alt="" data-tooltip-content={company.name} data-tooltip-id={`myTooltip-${company.name}`} />
                        <ReactTooltip id={`myTooltip-${company.name}`} place="top" />
                    </div> 
                </div>
                ))}
            </div>
        </div>
    );
}

export default Companies;