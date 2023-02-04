'use client'

import React, { useRef } from 'react'
import { debounce } from 'lodash'
import { supabaseClient } from 'lib/supabase-server'

const UPDATE_SERVER_LIKES_DEBOUNCE_MS = 1000

interface IBlogPostLikesButtonProps {
  likesCount: number
  likesId: number
}

export function BlogPostLikesButton({ likesCount, likesId }: IBlogPostLikesButtonProps) {
  const likesCountRef = useRef(likesCount)
  const likesIdRef = useRef(likesId)
  const [likesCountLocal, setLikesCountClient] = React.useState(likesCount)

  // We know there are no dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateLikes = React.useCallback(
    debounce(updateServerLikes, UPDATE_SERVER_LIKES_DEBOUNCE_MS),
    []
  )

  const handleClick = () => {
    setLikesCountClient(v => v + 1)
  }

  // Trigger server update
  React.useEffect(() => {
    if (likesCountLocal !== likesCountRef.current) {
      debouncedUpdateLikes(likesCountLocal, likesIdRef.current)
    }
    return () => debouncedUpdateLikes.cancel()
  }, [likesCountLocal, debouncedUpdateLikes])

  return (
    <div>
      Hotness has been liked {likesCountLocal}
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

function updateServerLikes(likesCountLocal: number, id: number) {
  console.log(`update supabase for likesCount: ${likesCountLocal} at id: ${id}`)
  const res = supabaseClient
    .from('blog_post_likes')
    .update({ likes_no: likesCountLocal }, { count: 'planned' })
    .eq('id', id)
    .select('*')

  console.log('**************************************************************************\n\n')
  console.log(`DEBUG ~ BlogPostLikesButton.tsx:L50`, `res`, res)
  console.log('\n\n**************************************************************************')
  console.log('**************************************************************************\n\n')
  console.log(`DEBUG ~ BlogPostLikesButton.tsx:L50`, `res.then(console.log)`, res.then(console.log))
  console.log('\n\n**************************************************************************')
}
