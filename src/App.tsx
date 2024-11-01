import { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import backgroundMap from '/background-map.png';
import './App.css';

function App() {
	const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
	const [imageProps, setImageProps] = useState({ width: 0, height: 0, x: 0, y: 0 });

	useEffect(() => {
		const img = new window.Image();
		img.src = backgroundMap;

		img.onload = () => {
			setBackgroundImage(img);

			const containerWidth = window.innerWidth;
			const containerHeight = window.innerHeight;
			const imageRatio = img.width / img.height;
			const containerRatio = containerWidth / containerHeight;

			let width, height, x, y;

			if (containerRatio > imageRatio) {

				height = containerHeight;
				width = containerHeight * imageRatio;
				x = (containerWidth - width) / 2;
				y = 0;
			} else {

				width = containerWidth;
				height = containerWidth / imageRatio;
				x = 0;
				y = (containerHeight - height) / 2;
			}

			setImageProps({ width, height, x, y });
		};
	}, []);

	return (
		<Stage width={window.innerWidth} height={window.innerHeight} style={{ backgroundColor: 'white' }}>
			<Layer>
				{backgroundImage && (
					<KonvaImage
						image={backgroundImage}
						x={imageProps.x}
						y={imageProps.y}
						width={imageProps.width}
						height={imageProps.height}
					/>
				)}
			</Layer>
		</Stage>
	);
}

export default App;
