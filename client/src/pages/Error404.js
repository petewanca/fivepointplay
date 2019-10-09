import React from "react";

const styles = {
    image: {
        width: "50%"
    }
}

export default function Error404() {
	return (
		<div>
			<h1>404</h1>
			<img
				style={styles.image}
				src="https://i.giphy.com/media/3oAt2dA6LxMkRrGc0g/giphy.webp"
				alt="James Harden 404"
			/>
		</div>
	);
}
