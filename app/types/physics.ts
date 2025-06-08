import Matter from 'matter-js';
import { InputState } from '../types/input';
import { System } from './system';

export default function Physics(input: InputState): System {
  return (entities: { physics: { engine: Matter.Engine; }; taxi: { body: Matter.Body; }; }, { time }: any) => {
    const engine = entities.physics.engine as Matter.Engine;
    const taxi = entities.taxi.body as Matter.Body;

    const force = 0.002;
    const turn = 0.03;

    if (input.forward) {
      const angle = taxi.angle;
      Matter.Body.applyForce(taxi, taxi.position, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force,
      });
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

    Matter.Engine.update(engine, time.delta);
    return entities;
  };
}
