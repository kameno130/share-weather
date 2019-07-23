class SharesController < ApplicationController

  before_action :move_to_login,  except: [:index]

  def index
  end

  def new
  end

  def create
  end

  private
  def move_to_login
    redirect_to new_user_registration_path unless user_signed_in?
  end
end
