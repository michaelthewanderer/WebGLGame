class Cube{
    constructor(center, radius){
        this.center= {x:center[0], y:center[1], z:center[2]};
        this.radius=radius;

        this.vertices = 
        [ // X, Y, Z           R, G, B
            // Top
            this.center.x-radius, this.center.y+radius, this.center.z-radius,   0.5, 0.5, 0.5,
            this.center.x-radius, this.center.y+radius, this.center.z+radius,   0.5, 0.5, 0.5,
            this.center.x+radius, this.center.y+radius, this.center.z+radius,   0.5, 0.5, 0.5,
            this.center.x+radius, this.center.y+radius, this.center.z-radius,    0.5, 0.5, 0.5,
    
            // Left
            this.center.x-radius, this.center.y+radius, this.center.z+radius,    0.75, 0.25, 0.5,
            this.center.x-radius, this.center.y-radius, this.center.z+radius,   0.75, 0.25, 0.5,
            this.center.x-radius, this.center.y-radius, this.center.z-radius,  0.75, 0.25, 0.5,
            this.center.x-radius, this.center.y+radius, this.center.z-radius,   0.75, 0.25, 0.5,
    
            // Right
            this.center.x+radius, this.center.y+radius, this.center.z+radius,    0.25, 0.25, 0.75,
            this.center.x+radius, this.center.y-radius, this.center.z+radius,   0.25, 0.25, 0.75,
            this.center.x+radius, this.center.y-radius, this.center.z-radius,  0.25, 0.25, 0.75,
            this.center.x+radius, this.center.y+radius, this.center.z-radius,   0.25, 0.25, 0.75,
    
            // Front
            this.center.x+radius, this.center.y+radius, this.center.z+radius,    1.0, 0.0, 0.15,
            this.center.x+radius, this.center.y-radius, this.center.z+radius,    1.0, 0.0, 0.15,
            this.center.x-radius, this.center.y-radius, this.center.z+radius,    1.0, 0.0, 0.15,
            this.center.x-radius, this.center.y+radius, this.center.z+radius,    1.0, 0.0, 0.15,
    
            // Back
            this.center.x+radius, this.center.y+radius, this.center.z-radius,    0.0, 1.0, 0.15,
            this.center.x+radius, this.center.y-radius, this.center.z-radius,    0.0, 1.0, 0.15,
            this.center.x-radius, this.center.y-radius, this.center.z-radius,    0.0, 1.0, 0.15,
            this.center.x-radius, this.center.y+radius, this.center.z-radius,    0.0, 1.0, 0.15,
    
            // Bottom
            this.center.x-radius, this.center.y-radius, this.center.z-radius,   0.5, 0.5, 1.0,
            this.center.x-radius, this.center.y-radius, this.center.z+radius,    0.5, 0.5, 1.0,
            this.center.x+radius, this.center.y-radius, this.center.z+radius,     0.5, 0.5, 1.0,
            this.center.x+radius, this.center.y-radius, this.center.z-radius,    0.5, 0.5, 1.0,
        ];

        this.indices = 
        [
            // Top
            0, 1, 2,
            0, 2, 3,
    
            // Left
            5, 4, 6,
            6, 4, 7,
    
            // Right
            8, 9, 10,
            8, 10, 11,
    
            // Front
            13, 12, 14,
            15, 14, 12,
    
            // Back
            16, 17, 18,
            16, 18, 19,
    
            // Bottom
            21, 20, 22,
            22, 20, 23
        ];

    }
}

//export default Cube;

