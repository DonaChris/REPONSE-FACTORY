@extends('templates.main')


@section('template-header')
    <style>
        table {
            border-collapse: collapse
        }

        table,
        table td {
            border: 1px solid black;
            padding: 0px;
        }

        table th {
            padding: 10px;
            border: 1px solid black;
        }

        table input,
        table select {
            border: none !important;
            border-radius: 0 !important
        }
    </style>
@endsection



@section('template-footer')
@endsection



@section('content')
    <div class="block-header">
        <div class="row">
            <div class="col-lg-5 col-md-8 col-sm-12">
                <h2>
                    <a href="{{ route('app-production-show', ['production' => $production->id]) }}"
                        class="btn btn-xs btn-link btn-toggle-fullwidth">
                        <i class="fa fa-arrow-left"></i>
                    </a>
                    {{ $pageTitle }}
                </h2>
            </div>
        </div>
    </div>
    @if ($staffs->count() > 0)
        <div class="card">
            <div class="body">
                @if (session('success'))
                    <p class="badge bg-success text-white p-3 fw-bold">Enregistrement effectué avec succès</p>
                @elseif(session('error'))
                    <p class="badge bg-danger text-white p-3 fw-bold">Un problème est survenu, veuillez bien complété les
                        champs puis réessayer</p>
                @endif
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active show" data-toggle="tab" href="#new-record">Enregistrements</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#histrory">Historiques et rapports</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <!-- Tab enregistrement -->
                    <div class="tab-pane show active" id="new-record">
                        <form method="post"
                            action="{{ route('app-staff-log-process', ['production' => $production->id]) }}" class="row"
                            id="form-log">
                            <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" hidden id="staff-production" name="staff-production"
                                value="{{ $production->id }}">

                            <div class="form-group col-lg-12" data-formidable-errorfor="staff-log-date">
                                <label for="">
                                    <span class="postiion-2">Date de l'opération</span>
                                </label>
                                <input type="datetime-local" max="{{ date('Y-m-d h:i') }}" name="staff-log-date"
                                    id="staff-log-date" required class="form-control app-form-elemnt fw-bold"
                                    style="height: fit-content" />
                            </div>
                            <div class="col-lg-12 my-3">
                                <table class="w-100">
                                    <thead>
                                        <th>Nom</th>
                                        <th>Nombre d'heure de travail</th>
                                        <th>Taux horaire</th>
                                    </thead>
                                    <tbody>
                                        @foreach ($staffs as $staff)
                                            <tr>
                                                <td data-formidable-errorfor="staff-log-id{{ $staff->id }}">
                                                    <input readonly type="text"
                                                        value="{{ $staff->surname . ' ' . $staff->name }}"
                                                        name="staff-log-ids[]" id="staff-log-id{{ $staff->id }}"
                                                        class="form-control app-form-elemnt fw-bold"
                                                        style="height: fit-content" />
                                                </td>
                                                <td data-formidable-errorfor="staff-log-hours{{ $staff->id }}">
                                                    <select name="staff-log-hours[]"
                                                        id="staff-log-hours{{ $staff->id }}"
                                                        class="app-form-elemnt fw-bold" required
                                                        style="height: fit-content">
                                                        @for ($i = 1; $i <= 12; $i++)
                                                            <option value="{{ $i }}">{{ $i }}h
                                                            </option>
                                                        @endfor
                                                        <option hidden value="" selected>Selectionner le nombre
                                                            d'heure
                                                        </option>
                                                    </select>
                                                </td>
                                                <td data-formidable-errorfor="staff-log-amounts{{ $staff->id }}">
                                                    <input type="number" value="" min="1" placeholder="0"
                                                        name="staff-log-amounts[]"
                                                        id="staff-log-amounts{{ $staff->id }}"
                                                        class="form-control app-form-elemnt fw-bold"
                                                        style="height: fit-content" />
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                            <div class="form-group col-lg-12 mt-2" data-formidable-errorfor="staff-log-observation">
                                <label for="staff-log-observation">
                                    <span class="placeholder postiion-2">Observations</span>
                                </label>
                                <textarea type="text" autocomplete="name" placeholder="ex: DOSSOU est arrivé en retard..."
                                    name="staff-log-observation" id="staff-log-observation" class="form-control app-form-elemnt fw-bold" value=""
                                    style="min-height: 100px"></textarea>
                                <div class="error"></div>
                            </div>

                            <div class="text-end mt-3">
                                <button name="staff-submit" id="staff-submit" value="submit"
                                    class="app-button-lg app-button-primary w-100 text-white mt-3  mb-2">
                                    <span style="display: none" class="spinner-border spinner-border-sm spin-progress"
                                        role="status" aria-hidden="true"></span>
                                    <span class="text">Enregistrer</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Tab historique -->
                    <div class="tab-pane" id="histrory">
                        <div class="table-responsive">
                            <table class="table m-b-0">
                                <thead style="bg-danger">
                                    <tr>
                                        <th class="bg-dark text-white">Date</th>
                                        <th class="bg-dark text-white">Nombre de personnes</th>
                                        <th class="bg-dark text-white">Heure total de travail</th>
                                        <th class="bg-dark text-white">Montant total dû</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if ($logStaff->count() < 1)
                                        <tr>
                                            <td colspan="4" class="text-center">
                                                <span class="text-muted">
                                                    Aucune opération enregistrée
                                                </span>
                                            </td>
                                        </tr>
                                    @else
                                        @foreach ($logStaff as $log)
                                            <tr class="fw-bold">
                                                <td>{{ date('d/m/Y', strtotime($log->operation_date)) }}</td>
                                                <td>{{ $log->total_staff }}</td>
                                                <td><span>{{ $log->total_hour }}h</span></td>
                                                <td class="text-danger"><span>{{ $log->total_amount }} F CFA</span>
                                                </td>
                                            </tr>
                                        @endforeach

                                    @endif

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <p>Ajouté d'abord du personnel</p>
    @endif

    <div class="py-4 py-lg-5">
        <div class="py-4 py-lg-5">
            <span style="opacity: 0">-</span>
        </div>
    </div>

@stop
