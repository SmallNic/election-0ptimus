class VotersController < ApplicationController


  def index
    @voters = Voter.all.order(:id).paginate(:page => params[:page], :per_page => 10)
    @voter = Voter.new
  end

  def create
    @voter = Voter.new(voter_params)
    if @voter.save
      render json: @voter
    else
      render :status => 400, :json => @voter.errors.to_json
    end
  end

  def show
    @voter = Voter.find(params[:id])
    render json: @voter
  end

  def update
    @voter = Voter.find(params[:id])
    if @voter.update(voter_params)
      render json: @voter
    else
      render :status => 400, :json => @voter.errors.to_json
    end
  end

  def destroy
    @voter = Voter.find(params[:id])
    @voter.destroy
    redirect_to root_path
  end

  private

  def voter_params
    params.permit(:first_name, :last_name, :address, :city, :state, :zip)
  end


end
