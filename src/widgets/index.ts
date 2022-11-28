import ModalDialog from '@/widgets/ModalDialog'
import LocaleInject from '@/widgets/LocaleInject'
import { DeleteDialog } from '@/widgets/ModalDialog'

export default {
  install(app: import('vue').App<any>) {
    app.use(ModalDialog)
    app.use(DeleteDialog)
    app.use(LocaleInject)
  }
}
