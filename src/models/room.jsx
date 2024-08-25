import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


import roomScene from '../assets/charite_university_hospital_-_operating_room.glb'
const Model=(props)=> {
  
  const { nodes, materials } = useGLTF(roomScene , true);
  
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.494}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[1.187, 270.993, 7.919]}
            rotation={[-0.419, 0.731, 0.285]}
            scale={33.906}>
            <mesh
              geometry={nodes.OP_Mitte_Mitte_OP_Tex3_0.geometry}
              material={materials.Mitte_OP_Tex3}
            />
            <mesh
              geometry={nodes.OP_Mitte_Mitte_OP_Tex2_0.geometry}
              material={materials.Mitte_OP_Tex2}
            />
            <mesh
              geometry={nodes.OP_Mitte_Mitte_OP_Tex1_0.geometry}
              material={materials.Mitte_OP_Tex1}
            />
            <mesh
              geometry={nodes.OP_Mitte_Mitte_OP_Tex4_0.geometry}
              material={materials.Mitte_OP_Tex4}
            />
            <mesh
              geometry={nodes.OP_Mitte_Mitte_OP_Tex4_0_1.geometry}
              material={materials.Mitte_OP_Tex4}
            />
          </group>
          <mesh
            geometry={nodes.Window_Door__0.geometry}
            material={materials.Window_Door__0}
            position={[-613.708, 302.808, -19.805]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.957, 105.416, 75.399]}
          />
          <mesh
            geometry={nodes.Window1__0.geometry}
            material={materials.Window_Door__0}
            position={[573.561, 328.377, 65.911]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.914, 100.708, 95.375]}
          />
          <mesh
            geometry={nodes.Window2__0.geometry}
            material={materials.Window_Door__0}
            position={[573.561, 325.814, -161.278]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.914, 100.708, 95.375]}
          />
        </group>
      </group>
    </group>
  )
}


export default Model;