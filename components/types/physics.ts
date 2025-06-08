import { InputState } from '@/components/types/input';
import { System } from '@/components/types/system';
import Matter from 'matter-js';

const Physics = (input: InputState): System => {
  return (entities: { physics: { engine: Matter.Engine; }; taxi: { body: Matter.Body; }; }, { time }: any) => {
    const engine = entities.physics.engine as Matter.Engine;
    const taxi = entities.taxi.body as Matter.Body;
    

    const force = 0.01;
    const turn = 0.03;
    // Add this at the top of the system function
    const VELOCITY_DAMPING = 0.1;
    // After applying forces and rotation:
    const forwardAngle = taxi.angle + Math.PI / 2;
    

// Slowly reduce velocity to simulate rolling friction
    Matter.Body.setVelocity(taxi, {
      x: taxi.velocity.x * VELOCITY_DAMPING,
      y: taxi.velocity.y * VELOCITY_DAMPING,
    });






    // Forward = Up screen
    if (input.forward) {
      const forwardAngle = taxi.angle - Math.PI / 2;
      Matter.Body.applyForce(taxi, taxi.position, {
        x: Math.cos(forwardAngle) * force,
        y: Math.sin(forwardAngle) * force,
        
      }
    );
    console.log('Angle:', taxi.angle.toFixed(2), 
              'Force dir: ', Math.cos(forwardAngle).toFixed(2), Math.sin(forwardAngle).toFixed(2));
    }
    

    if (input.backward) {
      Matter.Body.setVelocity(taxi, {
        x: taxi.velocity.x * 0.9,
        y: taxi.velocity.y * 0.9,
      });
    }

    if (input.left) {
      Matter.Body.setAngularVelocity(taxi, -turn);
    } else if (input.right) {
      Matter.Body.setAngularVelocity(taxi, turn);
    } else {
      Matter.Body.setAngularVelocity(taxi, 0);
    }

    // Clamp delta to max 16.667ms to avoid unstable steps
    const safeDelta = Math.min(time.delta, 1000 / 60);

    Matter.Engine.update(engine, safeDelta);

    return entities;
  };
};

export default Physics;
