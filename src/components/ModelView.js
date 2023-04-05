import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Cloud } from "@react-three/drei";

export default function ModelView() {
  return (
    <Canvas camera={{ position: [0, 2, 20], fov: 45 }}>
      <fog attach="fog" args={["#7400b8", 0, 550]} />
      <Model />

      <Globe position={[400, 150, -1010]} scale={10} />

      <group scale={10}>
        <ambientLight intensity={0.8} />
        <pointLight intensity={2} position={[0, 0, -1000]} />

        <Cloud
          position={[-35, 4, -55]}
          scale={3}
          width={8}
          speed={0.2}
          opacity={1}
          segments={20}
        />
        <Cloud
          position={[-15, 4, -55]}
          width={15}
          scale={3}
          speed={0.2}
          opacity={1}
          segments={10}
        />
        <Cloud
          position={[0, 4, -55]}
          width={12}
          scale={5}
          speed={0.2}
          opacity={1}
          segments={10}
        />
        <Cloud
          position={[15, 4, -55]}
          width={14}
          scale={2}
          speed={0.2}
          segments={10}
          opacity={1}
        />
        <Cloud
          position={[30, 4, -55]}
          width={10}
          segments={10}
          scale={2}
          speed={0.2}
          opacity={1}
        />
      </group>
    </Canvas>
  );
}

export function Globe(props) {
  const { nodes } = useGLTF("/globe.gltf");
  const group = useRef();
  useFrame(() => (group.current.rotation.y += 0.002));
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={15}>
            <mesh castShadow receiveShadow geometry={nodes.Object_7.geometry} />
          </group>
          <group scale={15}>
            <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} />
          </group>
          <group scale={15}>
            <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Model() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/town.glb");

  // Mouse movement handler
  const mouse = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  });

  // handel device tilt movement
  window.addEventListener("deviceorientation", (e) => {
    mouse.x = e.gamma / 90;
    mouse.y = e.beta / 90;
  });

  useFrame(() => {
    group.current.rotation.y = (mouse.x * Math.PI) / 10;
  });

  return (
    <group ref={group} scale={0.002} position={[0, -20, -100]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 20.2]}>
        <group position={[-102253.52, -210688.86, -17050.52]}>
          <mesh geometry={nodes.mesh_0.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
          <mesh geometry={nodes.mesh_1.geometry}>
            <meshBasicMaterial color="#260468" />
          </mesh>
          <mesh geometry={nodes.mesh_2.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
          <mesh geometry={nodes.mesh_3.geometry}>
            <meshBasicMaterial color="#3c096c" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
