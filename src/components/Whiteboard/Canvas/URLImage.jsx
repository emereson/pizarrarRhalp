import React from 'react';
import { Image } from 'react-konva';

class URLImage extends React.Component {
  state = {
    image: null
  };

  componentDidMount() {
    this.loadImage(this.props.src);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImage(this.props.src);
    }
  }

  componentWillUnmount() {}

  // En el método loadImage dentro de tu componente URLImage
  loadImage(src) {
    const image = new window.Image();
    image.crossOrigin = 'anonymous'; // Establecer la propiedad crossOrigin
    image.src = src;
    image.addEventListener('load', () => {
      const imageData = {
        width: image.width,
        height: image.height,
        src: src
      };
      // Almacenar en LocalStorage
      localStorage.setItem('canvasImageData', JSON.stringify(imageData));

      this.setState({
        image: image
      });
    });
  }

  calculateImageDimensions() {
    const { image } = this.state;
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 800;
    const horizontalWidth = 950;
    const verticalHeight = 800;
    const squareSize = 650;

    if (image) {
      const aspectRatio = image.width / image.height;
      let width, height;

      if (isMobile) {
        width = Math.min(screenWidth * 0.8, horizontalWidth);
        height = width / aspectRatio;
      } else if (aspectRatio > 1) {
        width = horizontalWidth;
        height = width / aspectRatio;
      } else if (aspectRatio < 1) {
        height = verticalHeight;
        width = height * aspectRatio;
      } else {
        width = squareSize;
        height = squareSize;
      }

      return { width, height };
    }

    return { width: 0, height: 0 };
  }

  render() {
    const { image } = this.state;
    const { width, height } = this.calculateImageDimensions();

    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={image}
        width={width}
        height={height}
        onLoad={this.props.onLoad}
      />
    );
  }
}

export default URLImage;
