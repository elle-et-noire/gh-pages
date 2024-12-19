import { GetAllPosts } from "@/lib/post";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
const External: NextPage<PageProps> = (props: PageProps) => {
  return (
    <div>
      <h1>{props.title}ですよ〜</h1>
    </div>
  )

}

export const getStaticPaths = async () => {
  return {
    paths: GetAllPosts().map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      title: params?.slug?.toString()
    }
  }
}

export default External