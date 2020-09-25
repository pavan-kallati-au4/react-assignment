import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/">Phones</Link>
      </nav>
    </div>
  )
}
