// contexts/UserContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import nookies from 'nookies'

type User = {
  address:string
  approved_at:string
  availability:string
  avatar:string
  avatar_url:string
  billing_id:string
  city:string
country:string
created_at:string
date_of_birth:string
deleted_at:string
domain:string,
email:string,
email_verified_at:string
first_name:string
gender:string
id:string
is_two_factor_enabled:string
last_name:string
name:string
password:string
phone_number:string
state:string
status:string
two_factor_secret:string
type:string
updated_at:string
username:string
zip_code:string
}

type UserContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (token: string, userData: User) => void
  logout: () => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = nookies.get(null).token
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setUser(data.data)
          }
        } catch (error) {
          console.error('Failed to validate token', error)
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = (token: string, userData: User) => {
    nookies.set(null, 'token', token, { path: '/' })
    setUser(userData)
  }

  const logout = () => {
    nookies.destroy(null, 'token')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}