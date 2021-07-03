import { createApp } from 'vue'
import Toast from './index.vue'

const createToast = (message) => {
  const instance = createApp(Toast, {
    message
  })

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  instance.mount(mountNode)
  setTimeout(() => {
    instance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, 2000)
}

export default createToast