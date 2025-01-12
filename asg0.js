function main() {
    var canvas = document.getElementById('example'); // Retrieve <canvas> element
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d'); // Get the rendering context for 2DCG

    ctx.fillStyle = 'black'; // Set the color of the canvas to black
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height); // Fill the canvas with black
}

// Function to draw a vector on the canvas
function drawVector(ctx, v, color) {
    ctx.strokeStyle = color; // Set the color of the vector
    ctx.beginPath(); // Start a new path
    ctx.moveTo(200, 200); // Move to the center of the canvas
    ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20); // Scale the vector
    ctx.stroke(); // Draw the vector
}

// Function to handle the draw button click event
function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear the canvas by filling it with black
    ctx.fillStyle = 'black'; // Set the color of the canvas to black
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height); // Fill the canvas with black

    // Draw v1 and v2
    var v1 = new Vector3([
        parseFloat(document.getElementById('xInput').value),
        parseFloat(document.getElementById('yInput').value),
        0,
    ]);
    var v2 = new Vector3([
        parseFloat(document.getElementById('xInput2').value),
        parseFloat(document.getElementById('yInput2').value),
        0,
    ]);
    drawVector(ctx, v1, "red"); // Draw v1 in red
    drawVector(ctx, v2, "blue"); // Draw v2 in blue
}

// Function to handle the second draw button for vector operations
function handleDrawOperationEvent() {
    var canvas = document.getElementById('example'); // Retrieve the canvas
    var ctx = canvas.getContext('2d'); // Get the rendering context

    // Clear the canvas
    ctx.fillStyle = 'black'; // Set the color of the canvas to black
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height); // Fill the canvas with black

    // Get operation and scalar
    var operation = document.getElementById('operation').value; 
    var scalar = parseFloat(document.getElementById('scalar').value);

    // Create vectors v1 and v2
    var v1 = new Vector3([
        parseFloat(document.getElementById('xInput').value),
        parseFloat(document.getElementById('yInput').value),
        0,
    ]);
    var v2 = new Vector3([
        parseFloat(document.getElementById('xInput2').value),
        parseFloat(document.getElementById('yInput2').value),
        0,
    ]);

    // Draw v1 and v2
    drawVector(ctx, v1, "red"); // Draw v1 in red
    drawVector(ctx, v2, "blue"); // Draw v2 in blue

    if (operation === "add") {
        var result = v1.add(v2); // Use the add method
        drawVector(ctx, result, "green"); // Draw the result in green
    } else if (operation === "sub") {
        var result = v1.sub(v2); // Use the sub method
        drawVector(ctx, result, "green"); // Draw the result in green
    } else if (operation === "mul") {
        var v3 = v1.mul(scalar); // Use the mul method
        var v4 = v2.mul(scalar); // Use the mul method
        drawVector(ctx, v3, "green"); // Draw the result in green
        drawVector(ctx, v4, "green"); // Draw the result in green
    } else if (operation === "div") {
        var v3 = v1.div(scalar); // Use the div method
        var v4 = v2.div(scalar); // Use the div method
        drawVector(ctx, v3, "green"); // Draw the result in green
        drawVector(ctx, v4, "green"); // Draw the result in green
    } else if (operation === "angle") {
        let angle = angleBetween(v1, v2); // Compute the angle between v1 and v2
        if (angle !== null) { // Check if the angle is defined
            console.log("Angle between v1 and v2: ", angle.toFixed(2) + "°"); // Print the angle in the console
        }
    } else if (operation === "area") {
        let area = areaTriangle(v1, v2); // Compute the area of the triangle formed by v1 and v2
        console.log("Area of the triangle formed by v1 and v2: ", area.toFixed(2)); // Print the area in the console
    } else if (operation === "magnitude") { 
        console.log("Magnitude of v1: ", v1.magnitude()); // Print the magnitude of v1 in the console
        console.log("Magnitude of v2: ", v2.magnitude()); // Print the magnitude of v2 in the console
    } else if (operation === "normalize") {
        var normalizedV1 = v1.normalize(); // Use the normalize method
        var normalizedV2 = v2.normalize(); // Use the normalize method
        console.log("Normalized v1: ", normalizedV1); // Print the normalized vector in the console
        console.log("Normalized v2: ", normalizedV2); // Print the normalized vector in the console
        drawVector(ctx, normalizedV1, "green"); // Draw the normalized vector in green
        drawVector(ctx, normalizedV2, "green"); // Draw the normalized vector in green
    }
}

// Function to compute the angle between two vectors
function angleBetween(v1, v2) {
    let dotProduct = Vector3.dot(v1, v2); // Use the static dot function
    let magnitudeV1 = v1.magnitude(); // Use the magnitude method
    let magnitudeV2 = v2.magnitude(); // Use the magnitude method
    if (magnitudeV1 === 0 || magnitudeV2 === 0) { // Check if either vector is a zero vector
        console.warn("One of the vectors is a zero vector; angle is undefined."); // Print a warning message in the console
        return null; // Return null to indicate that the angle is undefined
    }
    let cosTheta = dotProduct / (magnitudeV1 * magnitudeV2); // Compute the cosine of the angle
    cosTheta = Math.min(1, Math.max(-1, cosTheta)); // Clamp the value to the range [-1, 1]
    let angleInRadians = Math.acos(cosTheta); // Compute the angle in radians
    let angleInDegrees = (angleInRadians * 180) / Math.PI; // Convert the angle to degrees
    return angleInDegrees; // Return the angle in degrees
}

// Function to compute the area of a triangle formed by two vectors
function areaTriangle(v1, v2) {
    let crossProduct = Vector3.cross(v1, v2); // Compute the cross product
    let area = crossProduct.magnitude() / 2; // Area of the triangle is half the magnitude of the cross product
    return area; // Return the area of the triangle
}
