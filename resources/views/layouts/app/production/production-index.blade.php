@extends('templates.main')


@section('template-header')
@endsection


@section('template-footer')
    <script src="{{ asset('custom/js/app/production/production-edit.js') }}"></script>
    <script src="{{ asset('custom/js/app/production/production-index.js?c') }}" type="module"></script>
@endsection


@section('content')
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-8 col-sm-12">
                <h2>
                    <a href="{{ route('app-dashboard') }}" class="btn btn-xs btn-link btn-toggle-fullwidth">
                        <i class="fa fa-arrow-left"></i>
                    </a>
                    {{ $pageTitle }}
                </h2>
            </div>
        </div>
    </div>
    <hr>
    <div class="row clearfix">
        <p class="h5 mb-3">Production</p>
        @if ($production->closed_status == StatusHelpers::INACTIF)
            <div class="col-lg-4 col-md-6">
                <div class="card top_counter currency_state" role="button" data-bs-toggle="modal"
                    data-bs-target="#productionModal">
                    <div class="body">
                        <div class="icon">
                            <i class="fa fa-cogs text-primary"></i>
                        </div>
                        <div class="content pt-2">
                            <h5 class="number">Modifier les détails de la production</h5>
                        </div>
                    </div>
                </div>
            </div>
        @endif
        <div class="col-lg-4 col-md-6">
            <div class="card top_counter currency_state" role="button"
                onclick="location.href='{{ route('app-production-rapports', ['production' => $production->id]) }}'">
                <div class="body">
                    <div class="icon">
                        <i class="fa  fa-bar-chart-o text-warning"></i>
                    </div>
                    <div class="content pt-3">
                        <h5 class="number">Rapport de la production</h5>
                    </div>
                </div>
            </div>
        </div>

        @if ($production->closed_status == StatusHelpers::INACTIF)
            <div class="col-lg-4 col-md-6">
                <div class="card top_counter currency_state" role="button" id="btn-close-production">
                    <div class="body" style="background:#dc354524 !important">
                        <div class="icon">
                            <i class="fa fa-lock text-danger"></i>
                        </div>
                        <div class="content pt-3">
                            <div class="text  fw-bold text-danger">Clorturer la production</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="h5 mb-3">Main d'oeuvre</p>
            <div class="col-lg-6 col-md-12">
                <div class="card top_counter currency_state" role="button" data-bs-toggle="modal"
                    data-bs-target="#staffModal">
                    <div class="body">
                        <div class="icon">
                            <i class="fa text-success fa-users"></i>
                        </div>
                        <div class="content pt-3">
                            <h5 class="number">Ajout de personnel</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="card top_counter currency_state"
                    onclick="location.href='{{ route('app-staff', ['production' => $production->id]) }}'" role="button">
                    <div class="body ">
                        <div class="icon">
                            <i class="fa text-warning fa-clock-o"></i>
                        </div>
                        <div class="content pt-3">
                            <h5 class="number">Enregistrer l'horaire journalier</h5>
                        </div>
                    </div>
                </div>
            </div>
            <p class="h5 mb-3">Matières premières</p>
            <div class="col-lg-6 col-md-6">
                <div class="card top_counter currency_state" role="button">
                    <div class="body">
                        <div class="icon">
                            <i class="fa   fa-add text-info"></i>
                        </div>
                        <div class="content pt-3">
                            <h5 class="number">Réception de matière première</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="card top_counter currency_state" role="button">
                    <div class="body">
                        <div class="icon">
                            <i class="fa  fa-shopping-cart text-primary"></i>
                        </div>
                        <div class="content pt-3">
                            <h5 class="number">Usage de matière première</h5>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </div>

    <input type="hidden" name="production-data-input" id="production-data-input" value="{{ json_encode($production) }}"
        hidden>


    {{-- Modal production  --}}
    @include('components.modal.components-modal-production', ['modalDetail' => $production])

    {{-- Modal personal  --}}
    @include('components.modal.components-modal-personal-staff')

    <div class="py-4 d-lg-none d-block"></div>
@stop
