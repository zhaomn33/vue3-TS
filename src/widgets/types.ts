import { Component, VNode } from 'vue'

export type WidgetsPlugins = {
  $ModalDialog: ModalDialog
  $DeleteDialog: DeleteDialog
  visible?: boolean
}

type ModalDialog = (
  options: {
    title: string
    renderComponent: renderComponent
    onConfirm: onConfirm
    top?: string
    hidePadding?: boolean
    dialogWidth?: string
    maxHeight?: string | number
    height?: string
    hideFooter?: boolean
    showClose?: boolean
    confirmText?: string
    leftFooterText?: string
    showLeftFooter?: boolean
    onDownLoad?: any
    isShowCancelButton?: boolean
  }
) => VNode

export type DeleteDialog = (
  options: {
    title?: string
    onConfirm?: onConfirm
    renderComponent: renderComponent
    dialogWidth?: string
    maxHeight?: string | number
    height?: string
    showClose?: boolean
    confirmText?: string
    headerIcon?: string
    headerIconWarn?: boolean
    deleteType?: boolean
  }
) => VNode

export type ModalDialogOptions = {
  title: string
  renderComponent: renderComponent
  onConfirm: onConfirm
  top?: string
  hidePadding?: boolean
  dialogWidth?: string
  maxHeight?: string | number
  height?: string
  hideFooter?: boolean
  showClose?: boolean
  confirmText?: string
  headerIcon?: string
  headerIconWarn?: boolean
  deleteType?: boolean
}

export type DeleteDialogOptions = {
  title: string
  renderComponent: renderComponent
  onConfirm: onConfirm
  top?: string
  hidePadding?: boolean
  dialogWidth?: string
  maxHeight?: string | number
  height?: string
  hideFooter?: boolean
  showClose?: boolean
  confirmText?: string
  headerIcon?: string
  headerIconWarn?: boolean
  deleteType?: boolean
}

export type renderComponent = {
  data?: any
  component?: Component
}

export interface onConfirm {
  (instance: any): Promise<any>
}

