import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span>
          &copy; 2025 Culinary School. All rights reserved.
        </span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)
