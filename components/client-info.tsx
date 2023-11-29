'use client'
import type { GetServerSideProps, NextPage } from 'next'

interface PageProps {
  referer: string | undefined
  userAgent: string | undefined
  contentType: string | undefined
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
}) => {
  const referer = req.headers.referer
  const userAgent = req.headers['user-agent']
  const contentType = req.headers['content-type']
  return {
    props: {
      referer,
      userAgent,
      contentType,
    },
  }
}

const ClientPage: NextPage<PageProps> = ({
  referer,
  userAgent,
  contentType,
}) => {
  return (
    <div>
      <p>Referer: {referer}</p>
      <p>User Agent: {userAgent}</p>
      <p>Content Type: {contentType}</p>
    </div>
  )
}

export default ClientPage
