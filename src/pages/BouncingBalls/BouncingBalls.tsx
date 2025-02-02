import React, { useEffect, useRef } from "react";
import p5 from "p5";

const BouncingBalls: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let myP5: p5;

    const sketch = (p: p5) => {
      const balls: Ball[] = [];
      const numBalls = 3;
      const sphereRadius = 200;
      let angleX = 0;
      let angleY = 0;

      class Ball {
        position: p5.Vector;
        velocity: p5.Vector;
        radius: number;

        constructor() {
          this.position = p.createVector(
            p.random(-sphereRadius * 0.8, sphereRadius * 0.8),
            p.random(-sphereRadius * 0.8, sphereRadius * 0.8),
            p.random(-sphereRadius * 0.8, sphereRadius * 0.8)
          );
          this.velocity = p5.Vector.random3D().mult(p.random(1, 3));
          this.radius = 10;
        }

        update() {
          this.position.add(this.velocity);
        }

        checkCollision() {
          if (this.position.mag() + this.radius > sphereRadius) {
            const normal = this.position.copy().normalize();
            this.velocity.reflect(normal).mult(0.95);
            this.position = normal.mult(sphereRadius - this.radius);
          }
        }

        display() {
          p.push();
          p.translate(this.position.x, this.position.y, this.position.z);
          p.noStroke();
          p.fill(255, 255, 0);
          p.sphere(this.radius);
          p.pop();
        }
      }

      p.setup = () => {
        p.createCanvas(600, 600, p.WEBGL);
        for (let i = 0; i < numBalls; i++) {
          balls.push(new Ball());
        }
      };

      p.draw = () => {
        p.background(51);

        // Rotate the sphere slowly
        angleX += 0.01;
        angleY += 0.02;
        p.rotateX(angleX);
        p.rotateY(angleY);

        // Draw the outer sphere boundary
        p.noFill();
        p.stroke(255);
        p.sphere(sphereRadius);

        // Update and display balls
        for (const ball of balls) {
          ball.update();
          ball.checkCollision();
          ball.display();
        }
      };
    };

    if (canvasRef.current) {
      myP5 = new p5(sketch, canvasRef.current);
    }

    return () => {
      myP5?.remove();
    };
  }, []);

  return <div ref={canvasRef} style={{ width: "600px", height: "600px" }} />;
};

export default BouncingBalls;
