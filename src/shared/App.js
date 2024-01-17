import React, {useState, useEffect} from 'react'
import {Container, Row, Alert, Image} from 'react-bootstrap'
//import {CardImage} from './components/ui/CardImage'


export default function App() {

	const [data, setData] = useState(null)
	const url =  'https://arthurfrost.qflo.co.za/'

	const convertBytesToMegabytes = (bytes) => {
		const megabytes = parseInt(bytes)/(1024*1024)
		return megabytes.toFixed(2)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
				const jsonData = await response.json();
				const sortedTimeline = [...jsonData.Timeline]
				sortedTimeline.sort((a,b) => b.Episode - a.Episode)

				console.log('sortedTimeline: ', sortedTimeline)
			
				jsonData.Timeline = sortedTimeline
				setData(jsonData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		  };
	  
		  fetchData();
	}, [])

	return (
		<>
			<h1>{/*Test Successful*/}</h1>
			<>{
				data && (
					<Container>
						<div className="header" dangerouslySetInnerHTML={{__html: data.Body[0].About}}></div>
						<>{console.log('data: ', data)}</>

						<Row xs={1} md={2} lg={3}>
							{data.Timeline.map((item) => (
								<div key={item.Id} className='card__podcast'>
									<img className='podcast-image' src={url + item.Image}/>
									<div className='card__podcast--body'>
										<h4 className='podcast-title'>{item.Title}</h4>
										<ul className='ul__podcast list-reset'>
											<li>{`Ep: ${item.Episode} | ${item.CreateDate}`}</li>
											<li>
												<span className="vertical-align-center">
													{`${convertBytesToMegabytes(item.AudioSize)}MB`}
												</span>
											</li>
										</ul>
										<audio controls>
											<source src={url + item.Audio}/>
										</audio>
										<ul className='list-reset'>
											<li><Image className="image-icon" src={url + item.Icon} roundedCircle/></li>
											<li className='relative'>
												<Alert className='alert--wrapped alert--wrapped__normal vertical-centered' variant='primary'>
													{item.Category}
												</Alert>
											</li>
										</ul>									
										{/*
										{<div style={{textAlign: 'right'}}>
											<span>{`Audio Size: ${convertBytesToMegabytes(item.AudioSize)}MB`}</span>
										</div>
										*/}
									</div>
									
									
								</div>
							))}
						</Row>
					</Container>
				)
			}</>
		</>
	)
}
