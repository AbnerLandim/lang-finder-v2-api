const parseRepositories = (data: any) => {
  if (data !== {}) {
    const parsedData = data?.items?.map((item: any) => {
      return {
        fullName: item?.full_name ?? '--',
        description: item?.description ?? '--',
        url: item?.html_url ?? '--',
        avatarUrl: item?.owner?.avatar_url ?? '--',
        starsCount: item?.stargazers_count ?? 0,
      }
    })

    return parsedData
  }
  return {
    fullName: '--',
    description: '--',
    url: '--',
    avatarUrl: '--',
    starsCount: 0,
  }
}

export default parseRepositories
