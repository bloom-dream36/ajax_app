class PostsController < ApplicationController
 
  def index 
   @posts  = Post.all.order(id: "DESC") # 全てのレコードを＠postsに代入
  end

  # def new
  # end

  def create
    # メモ作成時に未読の情報を保存するようにしたこと
    post = Post.create(content:params[:content], checked:false)
    # レスポンスをJSONに変更した
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    
    item = Post.find(params[:id])
    render json: {post: item }
  end 
end
