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
  // 動的に作成する対象のページの元となる部分
  // return {
  //   paths: [
  //     { params: { id: '1' } },
  //     { params: { id: '2' } },
  //   ],
  //   fallback: false
  // }
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