@extends('templates.main')


@section('template-header')
@endsection


@section('template-footer')
    <script src="{{ asset('custom/js/app/production/production-add.js?b') }}"></script>
@endsection


@section('content')
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-8 col-sm-12">
                <h2>
                    <a href="javascript:void(0);" class="btn btn-xs btn-link btn-toggle-fullwidth">
                        <i class="fa fa-arrow-left"></i>
                    </a>
                    Productions
                </h2>
            </div>
        </div>
    </div>

    <div class="row clearfix">
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div class="card">
                <div class="header text-center" role="button" data-bs-toggle="modal" data-bs-target="#productionModal"
                    style=" background: var(--app-green-light-3); padding: 17px; border: 3px dashed var(--app-color-primary-3); ">
                    <h1 class="text-center" style="font-size: 3.5rem">
                        <i class="fa fa-plus-circle text-success"></i>
                    </h1>
                    <p class="text-center px-5 mt-3">Ajouter une nouvelle production</p>
                </div>
            </div>
        </div>
        @if (!empty($commons['productionList']))
            @foreach ($commons['productionList'] as $production)
                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                    onclick="location.href='{{ route('app-production-show', ['production' => $production->id]) }}'"
                    role="button">
                    <div class="card">
                        <div class="header">
                            <h2 style="font-size: 1.2rem">
                                {{ $production->name }}
                            </h2>
                        </div>
                        <div class="body">
                            <h5 class="m-b-15" style="font-size: 1rem">
                                @if ($production->closed_status == StatusHelpers::INACTIF)
                                    <span class="spinner-border spinner-border-sm spin-progress" role="status"
                                        aria-hidden="true"></span>
                                    <small>En cours</small> <br>
                                    <div class="progress progress-xs progress-transparent custom-color-purple mt-3">
                                        <div class="progress-bar" data-transitiongoal="0"></div>
                                    </div>
                                @else
                                    <span class="fa fa-check-circle text-success"></span>
                                    <small class="text-success">Terminé</small> <br>
                                    <div class="progress progress-xs progress-transparent  mt-3">
                                        <div class="progress-bar" data-transitiongoal="100"></div>
                                    </div>
                                @endif

                            </h5>

                            <div class="row">
                                <div class="col-7">
                                    <small><b>Objectif</b></small>
                                </div>
                                <div class="col-5">
                                    <div class="sparkline text-right" data-type="bar" data-width="97%" data-height="26px"
                                        data-bar-Width="2" data-bar-Spacing="7" data-bar-Color="#f96332">
                                        {{ $production->goal }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
    </div>


    @include('components.modal.components-modal-production')

    <div class="py-4 d-lg-none d-block"></div>
@stop
