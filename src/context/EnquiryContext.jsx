import React, { createContext, useContext, useReducer, useEffect } from 'react'

const EnquiryContext = createContext()
const STORAGE_KEY = 'cleansupply_enquiry'

const initialState = {
  items: [],
  isDrawerOpen: false,
  isQuoteModalOpen: false,
}

function enquiryReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.productId === action.payload.productId)
      let newItems
      if (existing) {
        newItems = state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        )
      } else {
        newItems = [
          ...state.items,
          { productId: action.payload.productId, quantity: action.payload.quantity || 1 },
        ]
      }
      return { ...state, items: newItems }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload) }
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.payload && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen }
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false }
    case 'OPEN_QUOTE_MODAL':
      return { ...state, isQuoteModalOpen: true, isDrawerOpen: false }
    case 'CLOSE_QUOTE_MODAL':
      return { ...state, isQuoteModalOpen: false }
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

export function EnquiryProvider({ children }) {
  const [state, dispatch] = useReducer(enquiryReducer, initialState)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) dispatch({ type: 'SET_ITEMS', payload: parsed })
      }
    } catch (e) {
      console.warn('Failed to load enquiry:', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch (e) {
      console.warn('Failed to save enquiry:', e)
    }
  }, [state.items])

  const value = {
    items: state.items,
    isDrawerOpen: state.isDrawerOpen,
    isQuoteModalOpen: state.isQuoteModalOpen,
    addItem: (productId, quantity = 1) =>
      dispatch({ type: 'ADD_ITEM', payload: { productId, quantity } }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    incrementQuantity: (productId) => dispatch({ type: 'INCREMENT_QUANTITY', payload: productId }),
    decrementQuantity: (productId) => dispatch({ type: 'DECREMENT_QUANTITY', payload: productId }),
    clearEnquiry: () => dispatch({ type: 'CLEAR' }),
    toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
    closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
    openQuoteModal: () => dispatch({ type: 'OPEN_QUOTE_MODAL' }),
    closeQuoteModal: () => dispatch({ type: 'CLOSE_QUOTE_MODAL' }),
    getUniqueProductCount: () => state.items.length,
  }

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider')
  return ctx
}