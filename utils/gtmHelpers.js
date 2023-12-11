export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const pageView = (pathToPage) => {
  window.gtag('config', GTM_ID, {
    page_path: pathToPage,
  })
}

export const triggerEvent = ({ action, category, label, values }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    values,
  })
}