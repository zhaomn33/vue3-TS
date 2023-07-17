<template>
  <div>
    <!-- 创建容器 -->
    <canvas id="container"></canvas>
    demo2----
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
// 引入three.js
import * as THREE from 'three'

export default defineComponent({
  name: 'ThreeJS',
  components: {},
  props: {},
  setup() {
    onMounted(() => {
      // 创建场景
      // 场景：三维空间 所有物品的容器
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#aaa')
      console.log('scene', scene)

      const canvas = document.querySelector('#container')
      console.log('canvas', canvas)

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
      })
      console.log('renderer', renderer)
      console.log('renderer--', renderer.autoClear)

      // 相机：用来确定位置、方向、角度，相机看到的内容即我们在屏幕上看到的内容
      // 透视摄像机 PerspectiveCamera ：符合我们人眼观察事物的特点， 近大远小
      // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )具有四个参数:
      // fov — 摄像机视锥体垂直视野角度。可以理解为人类的视野广度。
      // aspect — 摄像机视锥体横纵比。渲染结果的横向尺寸和纵向尺寸的比值，这里我们使用的是 浏览器窗口的宽高比。
      // near — 摄像机视锥体近端面。一切比近面更近的事物将不被渲染。
      // far — 摄像机视锥体远端面。一切比远面更远的事物将不被渲染，但是设置过大可能会影响性能。
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10

      const geometry = new THREE.BoxGeometry(2, 2, 2)
      const material = new THREE.MeshNormalMaterial({
        // 内部也有光
        side: THREE.DoubleSide,
        // wireframe 显示线条
        wireframe: true
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      renderer.setSize(canvas.clientWidth, canvas.clientHeight)

      console.log('THREE', THREE)

      // canvas.appendChild(renderer.domElement)
      // const control = new THREE.OrbitControls(camera, renderer.domElement)
      // control.enabled = true// 禁止事件
      // // 在动画里渲染
      // control.update()

      const animate = () => {
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.02
        // mesh.rotation.z += 0.02
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()
    })

    // 验证规则
    const validationRules = async() => {
      return new Promise((resolve) => {
        console.log('resolve', resolve)
        resolve(true)
        ElMessage.success('验证成功')
      })
    }
    return {
      validationRules
    }
  }

})
</script>

<style lang="scss" scoped>
#container {
  height: 400px;
}
</style>>
